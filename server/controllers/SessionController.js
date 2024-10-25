const Session = require("../models/Session");

const allBranches = ["CSE", "IT", "ECE", "EI", "MECH", "CIVIL"];

const createSession = async (year, currentBatch) => {
  try {
    for (const branch of allBranches) {
      // Create session for Jan to June (Even Semester)
      const janToJuneSession = new Session({
        from_year: year + 1,
        to_year: year + 1,
        from_month: "January",
        to_month: "June",
        enrolled_branch: branch,
        current_batch: currentBatch,
      });
      await janToJuneSession.save();

      // Create session for July to December (Odd Semester)
      const julyToDecSession = new Session({
        from_year: year,
        to_year: year,
        from_month: "July",
        to_month: "December",
        enrolled_branch: branch,
        current_batch: currentBatch,
      });
      await julyToDecSession.save();
    }

    console.log(
      `Sessions for the year ${year} have been created successfully.`
    );
  } catch (error) {
    console.error("Error creating sessions:", error);
  }
};

exports.createNewSessions = async (req, res) => {
  const { currentBatch } = req.body;

  if (typeof currentBatch !== number) {
    return res.status(403).send({
      success: false,
      message: "Invalid Batch!",
    });
  }

  const currentYear = new Date().getFullYear();
  console.log(currentYear);

  const sessionCreated = await createSession(currentYear, currentBatch);

  if (!sessionCreated) {
    return res.status(403).send({
      success: false,
      message: "Failed to create session for all B.Tech branches!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Session created successfully for all B.Tech branches!!",
  });
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ from_year: 1, from_month: 1 });

    const formattedSessions = sessions.map((session) => {
      return `${session.from_month} ${session.from_year} - ${session.to_month} ${session.to_year}`;
    });

    return res.status(200).json({
      success: true,
      sessions: formattedSessions,
      message: "All sessions retrieved",
    });
  } catch (error) {
    console.error("Error fetching sessions", error);
    return res.status(500).json({
      success: false,
      message: "Could not retrieve sessions",
    });
  }
};
