import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  List,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ShoeList } from "./components/ShoeList";
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import BadgeIcon from '@mui/icons-material/Badge';
import { ManagerList } from "./components/ManagerLList";
import { ShoeEdit } from "./components/ShoeEdit";
import { ShoeShow } from "./components/ShoeShow";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="shoes"
      icon={IceSkatingIcon}
      list={ShoeList}
      edit={ShoeEdit}
      show={ShoeShow}
      // show={ShowGuesser}
      
    />
    <Resource
      name="employee"
      icon={BadgeIcon}
      list={ManagerList}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
