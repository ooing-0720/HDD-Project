import React, {useEffect, useState}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import SignUp from './components/sign_up/Signup';
import SignIn from './components/sign_in/Signin';
import Project_recruit_board from "./components/recruit/board/Project_recruit_board";
import Roommate_recruit_board from "./components/recruit/board/Roommate_recruit_board";
import Roommate_recruit_write from "./components/recruit/write/Roommate_recruit_write";
import Project_recruit_write from "./components/recruit/write/Project_recruit_write";
import Main from './components/Main';
import Header from './layout/header/Header';
import Map from './components/map/Mapfood';
import Mapcafe from './components/map/Mapcafe';
import Promotion from './components/promotion/Promotion'
import Add_Promotion from "./components/promotion/Add_promotion";
import Project_recruit_detail from "./routes/Project_recruit_detail";
import Project_recruit_update from "./routes/Project_recruit_update";
import Roommate_recruit_detail from "./routes/Roommate_recruit_detail";
import Roommate_recruit_update from "./routes/Roommate_recruit_update";
import My_page from "./components/my_page/My_page";
import Update_password from "./components/my_page/Update_password";
function App() {

    //authenticated: 로그인 상태 확인

    const jwtToken = localStorage.getItem('jwtToken');
    const isAuthenticated = jwtToken !== null;

    useEffect(() => {

    }, [isAuthenticated]);
    return (
       <div className='App'>
          <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/api/auth/signin" element={<SignIn/>}></Route>
                <Route path="/api/auth/signup/create" element={<SignUp/>}></Route>
                <Route path="/recruitment/roommate" element={<Roommate_recruit_board/>}></Route>
                <Route path="/recruitment/roommate/write" element={<Roommate_recruit_write/>}></Route>
                <Route path="/recruitment/project" element={<Project_recruit_board/>}></Route>
                <Route path="/recruitment/project/write" element={<Project_recruit_write/>}></Route>
                <Route path="/promotion" element={<Promotion/>}></Route>
                <Route path="/promotion/add" element={<Add_Promotion/>}></Route>
                <Route path="/api/map" element={<Map/>}></Route>
                <Route path="/api/mapcafe" element={<Mapcafe/>}></Route>
                <Route path="/recruitment/project/:boardId" element={<Project_recruit_detail/>}/>
                <Route path="/recruitment/project/:boardId/update" element={<Project_recruit_update/>}/>
                <Route path="/recruitment/roommate/:boardId" element={<Roommate_recruit_detail/>}/>
                <Route path="/recruitment/roommate/:boardId/update" element={<Roommate_recruit_update/>}/>
                <Route path="/mypage" element={<My_page/>}/>
                <Route path="/mypage/update/password" element={<Update_password/>}/>
            </Routes>
          </BrowserRouter>
       </div>
    )
}

export default App;