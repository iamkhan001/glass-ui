import { useEffect, useState, React } from "react";
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom'
import {progressDialog, alertDialog} from "utils/diloag"

// Soft UI Dashboard React components
import {activateAccountApi, verifyTokenApi, apiCallUnsecureGet, apiPostUnsecure} from "utils/api"

import validator from 'validator'
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import CoverLayout from "../components/CoverLayout";
import {SettingsMenu} from "components/NavBar"


function Blank() {

  return (
    <CoverLayout
      title=""
      description=""
      image={curved9}
    >
      
    </CoverLayout>
  );
}

export default Blank;
