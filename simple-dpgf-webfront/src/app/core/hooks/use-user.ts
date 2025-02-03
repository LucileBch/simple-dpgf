// import { useMemo } from "react";
// import { apiEndpoints } from "../appConstants";
// import { UserDetailsDto } from "../dtos/user/UserDetailsDto";
// import { useHttp } from "./use-http";

// type UserHook = {
//   getCurrentUser(): Promise<UserDetailsDto>;
// };

// export function useUser(): UserHook {
//   const { get } = useHttp();

//   return useMemo(
//     () => ({
//       getCurrentUser(): Promise<UserDetailsDto> {
//         return get(apiEndpoints.USER, []).then((response) => {
//           if (response.status !== 404) {
//             return response.json();
//           } else {
//             throw new Error("ERROR GET USER CONNEXION");
//           }
//         });
//       },
//     }),
//     [get]
//   );
// }
