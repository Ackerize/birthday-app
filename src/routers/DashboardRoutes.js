import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { HomeScreen } from "../screens/HomeScreen";
import { BirthdayScreen } from "../screens/BirthdayScreen";

export const DashboardRoutes = () => {
    return (
      <>
        <Navbar />
        <div className="container mt-2">
          <Switch>
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/birthday" component={BirthdayScreen} />
            <Route exact path="/birthday/:idBirthday" component={BirthdayScreen} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </>
    );
  };