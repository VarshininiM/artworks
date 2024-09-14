import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';                         // Icons

// Function to fetch data from the API
const fetchData = async (page: number) => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
    const data = await response.json();
    return data;
};

const ArtworksTable: React.FC = () => {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedArtworks, setSelectedArtworks] = useState<any[]>([]);

    // Effect to fetch data whenever the page changes
    useEffect(() => {
        setLoading(true);
        fetchData(page).then(data => {
            setArtworks(data.data);  // Data from the API
            setTotalRecords(data.pagination.total);  // Total records for pagination
            setLoading(false);
        });
    }, [page]);

    // Pagination handler
    const onPageChange = (event: any) => {
        setPage(event.page + 1);  // PrimeReact uses 0-based index, so add 1
    };

    // Function to handle row selection
    const handleSelection = (e: any) => {
        setSelectedArtworks(e.value); // Update the selection state
    };

    return (
        <DataTable
            value={artworks}
            paginator
            rows={10}
            totalRecords={totalRecords}
            lazy
            loading={loading}
            onPage={onPageChange}
            selection={selectedArtworks}
            onSelectionChange={handleSelection}  // Use handleSelection for selection change
            dataKey="id"
            selectionMode="checkbox"
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
            <Column field="title" header="Title"></Column>
            <Column field="place_of_origin" header="Place of Origin"></Column>
            <Column field="artist_display" header="Artist Display"></Column>
            <Column field="inscriptions" header="Inscriptions"></Column>
            <Column field="date_start" header="Date Start"></Column>
            <Column field="date_end" header="Date End"></Column>
        </DataTable>
    );
};

export default ArtworksTable;
