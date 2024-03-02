import axios from 'axios';



const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export class Helpers {
    //empty token for header
    static token;
    // skeleton of request helper function
    static async request(endpoint, data ={}, method = 'get') {
        console.debug("API call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${Helpers.token}`};
        const params = (method === 'get')
            ? data
            : {};
        try {
            return (await axios({ url, method, data, params, headers}));
        } catch (err) {
            console.error("API Error:", err.response.data);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];

        }
    
    }
    
    

// user login helper function
    static async loginUser(username, password) {
        let res = await this.request(`login`, {username, password})
        console.log(res.data)
        return res.data;

    }
// user SignUp helper function
    static async signUpUser(username, password, email) {
        let res = await this.request(`register`, {username, password, email}, 'post')
        console.log(res.data)      
        return res.data;

    }
//call to get archived articles
static async getArticles(username) {
    let res = await this.request(`users/archives`, {username})
    console.log(res, 'RETURNING ARCHIVE!!');
    return res.data;
}   
// call to archive articles
static async saveArticle(username, url, title, description, author) {
        let res = await this.request(`users/frontpage`, {username, url, title, description, author}, 'post')
        console.log(res, "SAVED ARTICLE")
        return res.data;
    }

//post request to users/forum
    static async postForum(username, url, title, description, author, urlToImage) {
        let res = await this.request(`users/forum`, {username, url, title, description, author, urlToImage}, 'post')
        console.log(res, "FORUM!!!")
        return res.data
    }

//get Articles in Forum
    static async getForum() {
        let res = await this.request(`users/forum`)
        console.log(res.data, 'loading forum')
        return res.data;
    }

// post into comments table
    static async postComment(username, comment, forum_art_id, datetime) {
        let res = await this.request('users/forum/comments', {username, comment, forum_art_id, datetime}, 'post')
        console.log(res, 'posted Comment')
        return res.data;
    } 

// get all comments per article
    static async getAllComments(id) {
        let res = await this.request('users/forum/comments', {id} )
        console.log(res.data, 'loading comments')
        return res.data;

}
//post a like to comment table
    static async postLike(comment) {
        let res = await this.request('users/forum/likes', {comment}, 'post')
        console.log(res.data, "Like posted")
        return res.data;
    }

// get likes for each comment
    static async getPostLike(comment) {
        let res = await this.request('users/forum/likes', {comment})
        return res.data;
    } 


}