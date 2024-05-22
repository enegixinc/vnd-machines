import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useUser = defineStore('user', () => {
    const user = ref<unknown>(null),
        token = ref<string | null>(null),
        refreshToken = ref<string | null>(null),
        didAutoLogout=ref(false),
        expiredDate =ref(0),
        isAuthenticated = computed(()=>{
            return !!token.value
        });//
    let timer:number;


    function setUser(userInfo:unknown, userToken:string|null,userRefreshToken:string|null, expiresIn:number,newLogin?:boolean, rememberMe?:boolean):void{
        user.value= userInfo;
        token.value = userToken;
        refreshToken.value= userRefreshToken;
        expiredDate.value = expiresIn;
        if (newLogin){
            expiresIn = expiresIn? expiresIn * 1000 : 0;
            const expirationDate = new Date(expiresIn).getTime();
            if (userRefreshToken && userToken && userInfo && expirationDate && rememberMe){
                localStorage.setItem('token', userToken);
                localStorage.setItem('refreshToken', userRefreshToken);
                localStorage.setItem('user', JSON.stringify(userInfo));
                localStorage.setItem('tokenExpiration', expirationDate.toString());
            }
            timer = setTimeout(function() {
                autoLogout();
            }, expiresIn);
            expiredDate.value =  expirationDate;
        }
    }
    function setAutoLogout(){
        didAutoLogout.value = true;
    }
    function  tryLogin() {

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const refreshToken = localStorage.getItem('refreshToken');

        const expiresIn = tokenExpiration && !isNaN(+tokenExpiration)? +tokenExpiration - new Date().getTime():0;

        if (expiresIn <= 0) {
            return;
        }
        // bescause number in first too big
        const expiresInSeconds = expiresIn / 1000;
        timer = setTimeout(function() {
            console.log(expiresIn)
        }, expiresInSeconds * 1000);
        if (token && user && tokenExpiration) {
            setUser(user,token,refreshToken,+tokenExpiration)
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('refreshToken');
        clearTimeout(timer);
        setUser(null,null,null,0)
    }
   function autoLogout() {
        logout();
        setAutoLogout();
    }


    return {
        user,
        token,
        didAutoLogout,
        isAuthenticated,
        setUser,
        setAutoLogout,
        logout,
        tryLogin,
        refreshToken
    }
})

