import React from 'react';
import Challenges from '../components/Challenges';
import { useContext, useEffect, useState } from "react";
import { getAllUsers, getUser } from "../adapters/user-adapter";
import { fetchHandler } from "../utils";
import UserLink from "../components/UserLink";
import CurrentUserContext from "../contexts/current-user-context";
import { getPatchOptions } from "../utils";


const ChallengesPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  
    useEffect(() => {
      getAllUsers().then(setUsers);
    }, []);

    return (
        <div className='p-4'>
            <h1 className='font-bold md:m-5 flex items-center justify-center text-center align-middle'>Challenges</h1>
            <Challenges  users={users} />
        </div>
    );
};

export default ChallengesPage;