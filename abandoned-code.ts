// addInstallScript: async (parent, { _id }): Promise<Project> => {
//     try {
//         // Check if _id is valid (you might want to add more validation here)
//         if (!_id) {
//             throw new GraphQLError('Invalid project ID', {
//                 extensions: {
//                     code: 'INVALID_INPUT',
//                     invalidArgs: _id,
//                 },
//             });
//         }

//         const projectToUpdate = await generateInstallCommands(_id);
//         const {
//             installScripts,
//             frontend: { packages: frontendPackages },
//             backend: { packages: backendPackages },
//         } = projectToUpdate;

//         const updatedProject = await ProjectModel.findByIdAndUpdate(
//             _id,
//             {
//                 installScripts,
//                 frontend: { packages: frontendPackages },
//                 backend: { packages: backendPackages },
//             },
//             { new: true }
//         );

//         return updatedProject;
//     } catch (error) {
//         throw new GraphQLError('Failed to add install scripts', {
//             extensions: {
//                 code: 'INVALID_INPUT',
//                 invalidArgs: _id,
//             },
//         });
//     }
// },
