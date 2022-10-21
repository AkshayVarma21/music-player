import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination, InputBase, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { downloadSongDetails, searchItem } from '../network/apiDetails';
import MusicList from './MusicList';

const Home = () => {
    const [itemSearch, setItemSearch] = useState<string>('');
    const [songsList, setSongsList] = useState<any>();
    const [currentPageSongs, setCurrentPageSongs] = useState<any>();
    const [selectedTab, setSelectedTab] = useState<string>('');
    const [selectedSong, setSelectedSong] = useState<string>('');
    const [selectedSongDetails, setSelectedSongDetails] = useState<any>();


    useEffect(() => {
        onChangePage(null, 1)
    }, [])

    // Get songs list from search query
    const getList = () => {
        try {
            const requestData = {
                query: itemSearch,
            }
            if (itemSearch)
                searchItem(requestData).then(res => {
                    const temp = setPageNumber(res.body.data.result.songs)
                    setSongsList(temp);
                })
        } catch (err) {
            console.log(err);
        }
    }

    // Download a selected song to be played
    const downloadSong = (id: string) => {
        downloadSongDetails(id).then((res: any) => {
            if (res.body.data)
                setSelectedSong(res.body.data.result.download_url);
        })
        const selectedItem = songsList && songsList.find((item: any) => item.id === id);
        setSelectedSongDetails(selectedItem);
    }

    // on search click 
    const onSearch = () => {
        getList();
    }

    const setPageNumber = (list: any) => {
        let pageCount = 1;
        list.forEach((item: any, index: number) => {
            item['no'] = pageCount;

            if ((pageCount * (index + 1)) % 10 === 0 && ((index + 1) / 5) % 2 === 0) {
                pageCount++;
            }
        })

        return list

    }

    // Pagination page change functionality
    const onChangePage = (_: any, pageNo: number) => {
        const temp = songsList && songsList.filter((song: any) => song.no === pageNo)
        setCurrentPageSongs(temp)
    }
    return (
        <div>
            <Paper
                component="form"
                sx={{ p: '2px 10px', m: '2rem', display: 'inline-flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Music"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className='hoverable' onClick={onSearch} />
            </Paper>
            <MusicList
                listData={currentPageSongs}
                selectedTab={selectedTab}
                selectedSong={selectedSong}
                downloadSong={downloadSong}
                setSelectedSong={setSelectedSong}
                selectedSongDetails={selectedSongDetails} />

            <Pagination className='d-flex justify-content-end' count={songsList && (songsList.length / 10)} size="small" onChange={onChangePage} />

        </div >
    )
}

export default Home;