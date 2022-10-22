import { useState } from 'react';
import { Grid, List, ListItem, ListItemText, Avatar, Card, Collapse, CardActions } from "@mui/material";
import AudioPlayer from 'react-audio-player';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import '../utils/css/CommonStyles.scss';

interface IMusicList {
    listData: any,
    selectedSong: string,
    selectedSongDetails: any,
    downloadSong: (id: string) => void

}
const MusicList = (props: IMusicList) => {
    const { listData, selectedSong, downloadSong, selectedSongDetails } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    return (

        <div>
            {selectedSongDetails &&
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Grid item xs={3} className='song-card '>
                        <Card className='song-card '>
                            {selectedSongDetails &&
                                <div>
                                    <div className='song-title my-2'>{selectedSongDetails.title}</div>
                                    <img src={selectedSongDetails.thumbnail} alt="" />
                                </div>
                            }
                            {selectedSong &&
                                <div className='content-space'>
                                    <AudioPlayer
                                        src={selectedSong}
                                        autoPlay
                                        controls
                                    />
                                </div>
                            }
                            <CardActions disableSpacing className="expand-icon">
                                <FontAwesomeIcon icon={faAngleDown} onClick={() => setIsExpanded(!isExpanded)} />
                            </CardActions>
                            <Collapse className='content-space' in={isExpanded} timeout="auto" unmountOnExit>
                                <div>{`Album : ${selectedSongDetails.album.name}`}</div>
                                <div>{selectedSongDetails.name}</div>
                            </Collapse>
                        </Card>
                    </Grid>
                </Grid>
            }
            <div className='d-flex justify-content-center'>
                <List >
                    {listData && listData.map((item: any) => (
                        <ListItem>
                            <div className="d-flex justify-content-center align-items-center" onClick={() => downloadSong(item.id)}>
                                <Avatar className='mx-2' alt={item.title} src={item.thumbnail} />
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.name}
                                    className='song-list hoverable'
                                />
                            </div>
                        </ListItem>
                    ))
                    }
                </List>
            </div>
        </div>
    )
}

export default MusicList;