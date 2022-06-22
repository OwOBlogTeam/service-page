const getAssetsFile = (url, type = 'img') => {
    return new URL(`../../public/assets/${type}/${url}`, import.meta.url).href
 }

 export default getAssetsFile;