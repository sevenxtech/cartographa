import type { NextApiRequest, NextApiResponse } from "next";

import useClient from "@clients/useClient";
import {GetLayerOnIsoDocument, GetLayerOnIsoQuery} from "src/graphql/generated/graphql";


// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<GetUsersQuery>
// ) {
//   res.status(200).json({
//     "Users": [
//       {
//         "Id": 1,
//         "firstName": "Sam",
//       },
//       {
//         "Id": 2,
//         "firstName": "random",
//       }
//     ]
//   } )}

// const handler = async (
//   req: NextApiRequest,
//   res: NextApiResponse<GetOneCoordinatesQuery>
// ) => {
//   try {
//     console.log("api post request", req.body.language);
//     const data: GetOneCoordinatesQuery = await useClient().request(
//       GetOneCoordinatesDocument
//     );
//     console.log("api call", data);
//     res.status(200).json(data);
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
const useHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetLayerOnIsoQuery>
) => {
  try {
    console.log("api post request", req.body);
    const data: GetLayerOnIsoQuery = await useClient().request(GetLayerOnIsoDocument, {iso:req.body.isoCode}
    );
    console.log("api call", data);
    res.status(200).json(data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default useHandler;
