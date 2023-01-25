import AppLayout from "../../components/layout/app/app-layout";
import TileList from "../../components/layout/app/item-lists/tile-list";
import { buildDatabasePath, extractData } from "../api/database";

function AppPage(props) {
    return (
        <AppLayout>
            <TileList items={props.items} />
        </AppLayout>
    );
}

export async function getServerSideProps() {
    const filePath = buildDatabasePath();
    const data = await extractData(filePath);
    console.log(filePath);
    console.log(data);
    return {
        props: {
            items: data
        }
    };
}

export default AppPage;