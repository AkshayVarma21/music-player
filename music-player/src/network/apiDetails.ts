import { API } from "./apiClient";

export const searchItem = (data: any) => {
    const path = "https://youtube-music1.p.rapidapi.com/v2/search"
    return API.get(path, "GET_LIST", data);
}

export const downloadSongDetails = (id: string) => {
    const path = "https://youtube-music1.p.rapidapi.com/get_download_url"
    return API.get(path, "DOWNLOAD_SONG", {id});
}