import React from 'react';
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import RoomListPage from './Pages/HotelListPage/RoomListPage';
import RoomTypeListPage from './Pages/HotelListPage/RoomTypeListPage';
import CustomerListPage from './Pages/HotelListPage/CustomerListPage';
import ServiceListPage from './Pages/HotelListPage/ServiceListPage';
import EmployerListPage from './Pages/HotelListPage/EmployerListPage';
import ContractListPage from './Pages/HotelListPage/ContractListPage';
import BillListPage from './Pages/HotelListPage/BillListPage';

const routes = [
    {
        path : '/admin-mode',
        exact : true,
        main: () =>  <HomePage/>
    },
    {
        path : '/admin-mode/room',
        exact : false,
        main: () =>  <RoomListPage></RoomListPage>
    },
    {
        path : '/admin-mode/roomtype',
        exact : false,
        main: () =>  <RoomTypeListPage></RoomTypeListPage>
    },
    {
        path : '/admin-mode/customer',
        exact : false,
        main: () =>  <CustomerListPage></CustomerListPage>
    },
    {
        path : '/admin-mode/service',
        exact : false,
        main: () =>  <ServiceListPage></ServiceListPage>
    },
    {
        path : '/admin-mode/employer',
        exact : false,
        main: () =>  <EmployerListPage></EmployerListPage>
    },
    {
        path : '/admin-mode/contract',
        exact : false,
        main: () =>  <ContractListPage></ContractListPage>
    },
    {
        path : '/admin-mode/bill',
        exact : false,
        main: () =>  <BillListPage></BillListPage>
    },
    {
        path : '/admin-mode',
        exact : false,
        main: () => <NotFoundPage/>
    }
];

export default routes;