import connection from "../database";

interface NewSong{
    name:string;
    youtubeLink:string;
};

interface ResponseSong{
    id:number;
    name:string;
    youtubeLink:string;
    score:number;
};

async function searchForExistingSong(name: string): Promise<ResponseSong> {
    const request = await connection.query(`
    SELECT FROM songs
    WHERE name = $1
    `, [name]);

    return request.rows[0];
};

async function insertSong({name, youtubeLink}: NewSong) {
    await connection.query(`
    INSERT INTO songs (name, link)
    VALUES ($1, $2)
    `, [name, youtubeLink]);
};

async function searchSongById(id: number): Promise<ResponseSong> {
    const request = await connection.query(`
    SELECT * FROM songs
    WHERE id = $1
    `, [id]);

    return request.rows[0];
};

async function songsList(): Promise<ResponseSong[]>{
    const request = await connection.query(`
    SELECT * FROM songs
    `);

    return request.rows;
};

async function higherScoreSongs(amount:Number): Promise<ResponseSong[]> {
    const request = await connection.query(`
    SELECT * FROM songs
    ORDER BY score 
    DESC LIMIT $1
    `, [amount]);

    return request.rows;
};

export { insertSong, searchForExistingSong, searchSongById, songsList, higherScoreSongs, NewSong, ResponseSong };