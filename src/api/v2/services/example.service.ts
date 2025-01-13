// export class ExampleServiceV2 extends ExampleServiceV1 {
//     // Extend V1 functionality while adding new features
//     async findById(id: string): Promise<UserWithProfile> {
//         const user = await super.findById(id);
//         const profile = await this.getProfile(id);
//         return { ...user, profile };
//     }
// }