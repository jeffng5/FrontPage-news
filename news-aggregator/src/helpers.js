import axios from 'axios';



const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export class Helpers {
    //empty token for header

    static token;
    // skeleton of request helper function
    static async request(endpoint, data ={}, method = 'get') {
        
        const url = `${BASE_URL}/${endpoint}`;
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`};
        console.info("API call:", endpoint, data, method, headers);
        const params = (method === 'get')
            ? data
            : {};
        try {
            return (await axios({ url, method, data, params, headers}));
        } catch (err) {
            if (err.response) {

            
            console.error("API Error:", err.response.data);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
            }
            else{
                console.error(err)
            }
        }
    
    }
    
// user login helper function
    static async loginUser(username, password) {
       
      
        let res = await this.request(`login`, {username, password})
        if (res) {
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('username', res.data.user)
            return res.data;
        }
    }
    
    
// user SignUp helper function
    static async signUpUser(username, password, email) {
 
        let res = await this.request(`register`, {username, password, email}, 'post', )
        if (res) {
        console.log(res.data)      
        return res.data;}
        else {
            return ('401, inaccessible')
        }

    }
//call to get archived articles
static async getArticles(username) {
   

    let res = await this.request(`users/archives`, {username})
    if (res) {
    console.log(res, 'RETURNING ARCHIVE!!');
    return res.data;}
    else {
        return ('401, inaccessible')
    }
}   
// call to archive articles
static async saveArticle(username, url, title, description, author) {

   
    let res = await this.request(`users/frontpage`, {username, url, title, description, author}, 'post')
    if (res) {
    console.log(res, "SAVED ARTICLE")
    return res.data;}
    else {
        return ('401, inaccessible')
    }
    }

//post request to users/forum
    static async postForum(username, url, title, description, author, urlToImage) {
     
      
        let res = await this.request(`users/forum`, {username, url, title, description, author, urlToImage}, 'post')
        if (res) {
        console.log(res, "FORUM!!!")
        return res.data;}
        else {
            return ('401, inaccessible')
        }
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
        if (res) {
        console.log(res, 'posted Comment')
        return res.data;}
        else {
            return ('401, inaccessible')
        }
    } 

// get all comments per article
    static async getAllComments(id) {

        
        let res = await this.request('users/forum/comments', {id})
        if (res) {
        console.log(res.data, 'loading comments')
        return res.data;}
        else {
            return ('401, inaccessible')
        }

}
//post a like to comment table
    static async postLike(comment) {

      
        let res = await this.request('users/forum/likes', {comment}, 'post')
        if (res) {
        console.log(res.data, "Like posted")
        return res.data;}
        else {
            return ('401, inaccessible')
        }
    }

// get likes for each comment
    static async getPostLike(comment) {

       
        let res = await this.request('users/forum/likes', {comment})
        if (res) {
        return res.data;}
        else {
            return ('401, inaccessible')
        }
    } 


}