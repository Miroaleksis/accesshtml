const cards = document.querySelectorAll('.card');
const search = document.getElementById('pattern-search');
const searchResults = document.getElementById('home-search-results');
let appliedQuery = '';

function applyFilters() {
  const category = document.querySelector('.filter-bar input:checked').value;
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('h2').textContent.toLowerCase();
    const matchesSearch = !appliedQuery || name.includes(appliedQuery);
    const matchesCategory = category === 'all' || card.querySelector('.tag--' + category);
    card.hidden = !matchesSearch || !matchesCategory;
    if (!card.hidden) visible++;
  });

  searchResults.textContent = appliedQuery ? visible + ' results' : '';
}

function performSearch() {
  appliedQuery = search.value.toLowerCase().trim();
  if (appliedQuery) {
    const category = document.querySelector('.filter-bar input:checked').value;
    const hasMatch = [...cards].some(card => {
      const name = card.querySelector('h2').textContent.toLowerCase();
      return name.includes(appliedQuery) && (category === 'all' || card.querySelector('.tag--' + category));
    });
    if (!hasMatch) document.querySelector('.filter-bar input[value="all"]').checked = true;
  }
  applyFilters();
}

search.addEventListener('input', () => {
  if (search.value === '') {
    appliedQuery = '';
    applyFilters();
  }
});

search.addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

document.getElementById('search-btn').addEventListener('click', performSearch);

document.querySelectorAll('.filter-bar input').forEach(input => {
  input.addEventListener('change', applyFilters);
});

const grid = document.querySelector('.cards-grid');
const sortBtn = document.getElementById('sort-btn');
let ascending = true;

sortBtn.addEventListener('click', () => {
  ascending = !ascending;
  const sorted = [...cards].sort((a, b) =>
    a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent));
  if (!ascending) sorted.reverse();
  sorted.forEach(card => grid.appendChild(card));
  sortBtn.textContent = ascending ? 'Z–A' : 'A–Z';
  sortBtn.setAttribute('aria-label', ascending ? 'Sort Z–A' : 'Sort A–Z');
  sortBtn.dataset.order = ascending ? 'asc' : 'desc';
});
