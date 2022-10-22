import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination, InputBase, Paper, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { downloadSongDetails, searchItem } from '../network/apiDetails';
import bgTheme from '../assets/images/music-theme4.jpg';
// import { TAB_TYPE } from '../utils/Constants';
import MusicList from './MusicList';

interface IToastDetails {
    type: string,
    message: string,
}

const Home = () => {
    const [itemSearch, setItemSearch] = useState<string>('');
    const [songsList, setSongsList] = useState<any>();
    const [currentPageSongs, setCurrentPageSongs] = useState<any>();
    const [selectedSong, setSelectedSong] = useState<string>('');
    const [selectedSongDetails, setSelectedSongDetails] = useState<any>();
    const [toast, setToastDetails] = useState<IToastDetails>({ type: "", message: "" });

    // Initial load
    useEffect(() => {
        onChangePage(null, 1)
    }, [songsList])

    // Get songs list from search query
    const getList = () => {
        try {
            const requestData = {
                query: itemSearch,
            }
            if (itemSearch)
                searchItem(requestData).then(res => {
                    if (res) {
                        const temp = setPageNumber(res.body.data.result.songs)
                        setSongsList(temp);
                    }
                    else {
                        setToastDetails({ type: "error", message: "Unable to load songs" })
                    }
                })
        } catch (err) {
            setToastDetails({ type: "error", message: "Unable to load songs" })
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
        <div className='root-style' style={{ backgroundImage: `url(${bgTheme})` }}>
            <Paper
                component="form"
                sx={{ p: '2px 10px', m: '2rem', display: 'inline-flex', alignItems: 'center', maxWidth: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Music"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className='hoverable' onClick={onSearch} />
            </Paper>
            {/* TODO: To be updated once artists and albums api */}

            {/* <div className='d-flex justify-content-center '>
                <BottomNavigation
                    className='tab-bar'
                    showLabels
                    value={selectedTab}
                    onChange={(event, newValue) => {
                        setSelectedTab(newValue);
                    }}
                    sx={{ p: '2px 10px', m: '2rem', width: 400 }}
                >
                    <BottomNavigationAction label="All" value={TAB_TYPE.ALL} />
                    <BottomNavigationAction label="Albums" value={TAB_TYPE.ALBUMS}/>
                    <BottomNavigationAction label="Artists" value={TAB_TYPE.ARTISTS}/>
                </BottomNavigation>
            </div> */}
            <MusicList
                listData={currentPageSongs}
                selectedSong={selectedSong}
                downloadSong={downloadSong}
                selectedSongDetails={selectedSongDetails} />
            {songsList && songsList.length > 0 &&
                <Pagination count={songsList && (songsList.length / 10)} size="small" onChange={onChangePage} color='primary' />
            }
            <Snackbar open={!!toast.type} autoHideDuration={6000} onClose={() => setToastDetails({ type: "", message: "" })}>
                <Alert onClose={() => setToastDetails({ type: "", message: "" })} severity="error" sx={{ width: '100%' }}>
                    {toast && toast.message}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Home;