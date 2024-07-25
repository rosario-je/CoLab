import db from '../connection.js';

const getAllProjects = async () => {
  try {
    const data = await db.query(
      `SELECT * FROM projects`,
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// This will be the improved version of the getAllProjects function
// const getAllProjects = async (user_id) => {
//   try {
//     const data = await db.query(
//       `SELECT * FROM projects
//       WHERE NOT user_id = $1
//       ORDER BY projects.created_at ASC`,
//       [user_id]
//     );
//     return data.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

//This will be to get the projects that a logged in user has created
// const getMyProjects = async (user_id) => {
//   try{
//     const data = await db.query(
//       `SELECT * FROM projects
//       WHERE user_id = $1
//       ORDER BY projects.created_at ASC`,
//       [user_id]
//     );
//     return data.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

export { getAllProjects };