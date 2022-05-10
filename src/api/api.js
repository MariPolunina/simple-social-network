import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4497f506-0692-499e-a4d1-ac046a062b4d"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`);
    },
    getFriends(currentPage=1, pageSize=10){
        return instance.get(`users?friend=true&page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    lookingForUsers(name, pageSize=10){
        return instance.get(`users?term=${name}&count=${pageSize}`)
    }
} 

export const headerAPI={
    getAuthMe(){
        return instance.get('auth/me')
    },
    login(parametrs){
        return instance.post('auth/login', parametrs);
    },
    logOut(){
        return instance.delete('auth/login')
    }
}

export const profileAPI={
    getCurrentProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status})
    },
    savePhoto(photoFile){
        let formData=new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`,formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
    },
    updateProfile(message){
        return instance.put(`profile`, message)
    }
}


export const securityAPI={
    getCaptcha(){
        return instance.get(`/security/get-captcha-url`);
    }
}