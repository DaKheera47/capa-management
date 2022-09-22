import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/models";
import { CapaDoc } from "../../utils/models/capa";
import { FindingDoc } from "../../utils/models/finding";
import { CapaData } from "../../utils/types/capa";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<CapaData | CustomError>
) => {
    switch (req.method) {
        case "GET":
            try {
                const capas = await db.Capa.find<CapaDoc>();
                let capaData = capas.map((f) => f.toObject<CapaDoc>());
                if (capaData) {
                    return res.status(200).json({ capas: capaData });
                } else {
                    return res.status(200).json({ capas: [] });
                }
            } catch (error) {
                res.status(400).json({ message: "An error occured" });
            }

        case "POST":
            try {
                // const finding = await db.Finding.create<FindingDoc>(
                //     req.body.finding
                // );

                console.log(req.body);

                const capa = await db.Capa.create<CapaDoc>({
                    title: req.body.title,
                    finding: req.body.priority,
                    description: req.body.description,
                    createdBy: req.body.createdBy,
                });

                console.log(capa)

                return res.status(201).json({ capas: capa });
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: "An error occured" });
            }
    }
};

export default handler;
