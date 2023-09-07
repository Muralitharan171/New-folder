

//1.Find all the topics and tasks which are thought in the month of October

db.tasks.find({"date": { $gte : ISODate( "2020-10-01") , $lte : ISODate("2020-11-01")}})
db.topics.find({"date": { $gte : ISODate( "2020-10-01") , $lte : ISODate("2020-11-01")}})

//2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({"drive_date" : { $gte : ISODate("2020-10-15") , $lte : ISODate("2020-10-31")}})

// 3.Find all the company drives and students who are appeared for the placement.

db.company_drives.find()
db.users.find({role:"student"})


// 4.Find the number of problems solved by the user in codekata

db.users.aggregate([{ $lookup : { from : "codekata" , localField : "_id" , foreignField : "user_id" , as : "problems_solved"} }])


// 5.Find all the mentors with who has the mentee's count more than 15

db.mentors.find({mentee_count : {$gte:15}})


// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: ISODate("2020-10-15T00:00:00Z"),
          $lte: ISODate("2020-10-31T23:59:59Z")
        },
        present: false
      }
    },
    {
      $lookup: {
        from: "Tasks",
        localField: "user_id",
        foreignField: "user_id",
        as: "tasks"
      }
    },
    {
      $match: {
        "tasks.date": {
          $gte: ISODate("2020-10-15T00:00:00Z"),
          $lte: ISODate("2020-10-31T23:59:59Z")
        },
        "tasks.task_description": { $exists: false }
      }
    },
    {
      $group: {
        _id: null,
        num_users: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);
  