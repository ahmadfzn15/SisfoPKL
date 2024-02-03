import Card from "@/Components/Card";
import CardTile from "@/Components/CardTile";
import Layout from "@/Layout/Layout";
import { Switch } from "@material-tailwind/react";

export default function Setting() {
    return (
        <Layout title="Setting" className="space-y-4">
            <Card title="Personal Information">
                <CardTile
                    title="Change account visibility"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus, quis?"
                    action={<Switch color="blue" />}
                />
            </Card>
            <Card title="Account and Privacy">
                <CardTile
                    title="Change account visibility"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus, quis?"
                    action={<Switch color="blue" />}
                />
                <CardTile
                    title="Change account visibility"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus, quis?"
                    action={<Switch color="blue" />}
                />
            </Card>
        </Layout>
    );
}
