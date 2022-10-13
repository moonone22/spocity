import axios from "axios";
import { getCookie, setCookie } from "./cookie";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
// axios
export const ScoreCount = async (url,setState) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + url).then(res=> setState(res?.data?.data)).catch(err => console.log(err))
};

// axios
export const TimeStampData = async (setState) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + "/api/timestamp").then(res=> setState(res.data)).catch(err => console.log(err))
};

// axios
export const MemberMe = async (setState) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + "/api/member/me" , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=> {
        if(res.data.extra !== null){
            // 타임스탬프값과 newdate값 비교
            // 비교한 값에 6시간 더함
            const timePlus =  21600;
            let expires = new Date();
            expires.setSeconds(expires.getSeconds() + timePlus);
            setCookie('cityauth' , res.data.extra?.Authorization  , {
                path:"/",
                expires,
                // secure:true,
                // sameSite:'none',
              })
        }else{
            setState(res.data)
        }
    }).catch(err => {
        console.log(err.response.data.status === 400)
    if(err.response.data.status === 400){
        cookies.remove("cityauth")
        // window.location.reload()
    }})
};

// axios
export const LogOut = async () => {
    return await axios.get(process.env.REACT_APP_DB_HOST + "/api/member/logout" , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res => {
        if(res.data.status_code === 200 ){
            cookies.remove('cityauth')
          window.location.reload()
        }else if(res.status === 400){
          alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
          alert(res.data.msg)
        }
    }).catch(function (error) {
        console.log(error)
        alert(error.response.data.msg)
    });
};

// axios
export const UserDelte = async (password , reason) => {
    return await axios.post(process.env.REACT_APP_DB_HOST + "/api/member/delete" , {
        password : password,
        reason : reason
      },{
        headers : {
          Authorization : getCookie('cityauth')
        }
    }).then(res => {
        if(res.data.status_code === 200 ){
          alert(res.data.data.msg)
          cookies.remove("cityauth")
          window.location.reload()
        }else if(res.status === 400){
          alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
          alert(res.data.msg)
        }
    }).catch(function (error) {
        console.log(error)
        alert(error.response.data.msg)
    });
};



// axios
export const LogOutAll = async () => {
    return await axios.get(process.env.REACT_APP_DB_HOST + "/api/member/logout/all" , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res => {
        if(res.data.status_code === 200 ){
          window.location.reload()
        }else if(res.status === 400){
          alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
          alert(res.data.msg)
        }
    }).catch(function (error) {
        console.log(error)
        alert(error.response.data.msg)
    });
};

// axios
export const BasicData = async (setState) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + "/api/common/info" , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};



// axios
export const TimeCountApi =  (timeCount , timeExtension) => {
        var count = timeCount;
        var counter = null;
        initCounter();
        function initCounter() {
            if(getCookie("cityauth") === undefined ){
                clearInterval(counter);
                window.localStorage.removeItem('counts');
            }else{
                counter = setInterval(timer, 1000); //1000 will run it every 1 second
                // setModalToast(false)
            }
        }
        function setLocalStorage(key, val) {
        if (window.localStorage) {
            window.localStorage.setItem(key, val);
        }
            return val;
        }
        function timer() {
            count = setLocalStorage('counts', (window.localStorage.getItem("counts") !== "" && Number(window.localStorage.getItem("counts")) > 0) ? window.localStorage.getItem("counts") - 1 : count - 1);
    }
}

// // axios
// export const Login = async () => {
//     return await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/register/verify/email/send').then(res=> setState(res?.data?.data)).catch(err => console.log(err))
// };
  

// axios
export const ScheduleDataVolleyball = async (setState , cateGory, date , order ) => {
    if(cateGory !== "live"){
        return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/volleyball/match/schedule?category=${cateGory}&date=${date}&order=${order}` , {
            headers : {
                Authorization : getCookie('cityauth')
            }
        }).then(res=>{ 
            if(res.data.status_code === 200 ){
                setState(res.data)
            }else if(res.status === 400){
                alert(res.data.data.msg)
            }else if(res.data.status_code === 400){
                alert(res.data.msg)
            }}
        ).catch(err => console.log(err))
    }else {
        return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/volleyball/match/schedule?category=${cateGory}&order=${order}` , {
            headers : {
                Authorization : getCookie('cityauth')
            }
        }).then(res=>{ 
            if(res.data.status_code === 200 ){
                setState(res.data)
            }else if(res.status === 400){
                alert(res.data.data.msg)
            }else if(res.data.status_code === 400){
                alert(res.data.msg)
            }}
        ).catch(err => console.log(err))
    }
};


// axios
export const ScheduleDataSoccer = async (setState , cateGory, date , order ) => {
    if(cateGory !== "live"){
        return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/match/schedule?category=${cateGory}&date=${date}&order=${order}` , {
            headers : {
                Authorization : getCookie('cityauth')
            }
        }).then(res=>{ 
            if(res.data.status_code === 200 ){
                setState(res.data)
            }else if(res.status === 400){
                alert(res.data.data.msg)
            }else if(res.data.status_code === 400){
                alert(res.data.msg)
            }}
        ).catch(err => console.log(err))
    }else {
        return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/match/schedule?category=${cateGory}&order=${order}` , {
            headers : {
                Authorization : getCookie('cityauth')
            }
        }).then(res=>{ 
            if(res.data.status_code === 200 ){
                setState(res.data)
            }else if(res.status === 400){
                alert(res.data.data.msg)
            }else if(res.data.status_code === 400){
                alert(res.data.msg)
            }}
        ).catch(err => console.log(err))
    }
};


// axios
export const LiveDataVolleyball = async (setState , option , order ) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/volleyball/match/live?option=${option}&order=${order}` , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};





// 축구 상세정보
export const DetailDataSoccer = async (setState , matchId ) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/h2h/detail/${matchId}` , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};



// 축구 순위 정보
export const RankDataSoccer = async (setState , matchId ) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/rankup/detail/${matchId}` , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};


// 축구 라인업 정보
export const LineUpDataSoccer = async (setState , matchId ) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/lineup/detail/${matchId}` , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};

// 축구아이프레임 정보
export const IframeDataSoccer = async (setState , matchId ) => {
    return await axios.get(process.env.REACT_APP_DB_HOST + `/api/main/football/match/detail/${matchId}` , {
        headers : {
            Authorization : getCookie('cityauth')
        }
    }).then(res=>{ 
        if(res.data.status_code === 200 ){
            setState(res.data)
        }else if(res.status === 400){
            alert(res.data.data.msg)
        }else if(res.data.status_code === 400){
            alert(res.data.msg)
        }}
    ).catch(err => console.log(err))
};

