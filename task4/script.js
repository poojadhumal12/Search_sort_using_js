document.addEventListener('DOMContentLoaded', () => {
    const getCellValue = (row, index) => row.children[index].innerText || row.children[index].textContent;
    
    const comparer = (index, asc) => (a, b) => ((v1, v2) => 
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, index), getCellValue(asc ? b : a, index));
    
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tbody > tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.querySelector('tbody').appendChild(tr) );
    }));
});
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchText = this.value.toLowerCase();
    const rows = document.querySelectorAll('#myTable tbody tr');
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const match = Array.from(cells).some(td => td.textContent.toLowerCase().includes(searchText));
        row.style.display = match ? '' : 'none';
    });
});
