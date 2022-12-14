import {
    Button,
    Label,
    Select,
    Table,
    Textarea,
    TextInput,
} from "flowbite-react";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { possibleFindings } from "../utils/models/capa";
import { CapaData } from "../utils/types/capa";

const Home: NextPage = () => {
    const { data, error, mutate } = useSWR<CapaData>("/api/capa", fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());

        console.log(values);

        fetch("/api/capa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
            }),
        }).then((res) => {
            console.log(res.body);
            mutate(data);
        });
    };

    return (
        <div className="w-4/5 mx-auto">
            <Head>
                <title>CAPA Management</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="text-4xl font-bold my-8">CAPA Management</h1>

                <div className="mb-10">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>CAPA Title</Table.HeadCell>
                            <Table.HeadCell>CAPA Priority</Table.HeadCell>
                            <Table.HeadCell>CAPA Description</Table.HeadCell>
                            <Table.HeadCell>CAPA Created By</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data?.capas?.map((capa) => (
                                <Table.Row
                                    key={String(capa._id)}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {capa.title}
                                    </Table.Cell>
                                    <Table.Cell>{capa.finding}</Table.Cell>
                                    <Table.Cell>{capa.description}</Table.Cell>
                                    <Table.Cell>{capa.createdBy}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-5">
                        <Label htmlFor="title" value="CAPA Title" />
                        <TextInput name="title" id="title" required={true} />

                        <Label htmlFor="description" value="CAPA Description" />
                        <Textarea
                            name="description"
                            id="description"
                            required={true}
                        />

                        <Label htmlFor="createdBy" value="CAPA Created By" />
                        <TextInput
                            name="createdBy"
                            id="createdBy"
                            required={true}
                        />

                        <Label htmlFor="priority">Finding Priority</Label>
                        <Select id="priority" name="priority" required={true}>
                            <option value="Low Priority">Low Priority</option>
                            <option value="Medium Priority">
                                Medium Priority
                            </option>
                            <option value="High Priority">High Priority</option>
                        </Select>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </main>
        </div>
    );
};

export default Home;
