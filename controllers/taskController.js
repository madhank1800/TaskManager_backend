const task = require("../models/task");

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const taskData = new task({
      title: title,
      description: description,
      // status:status
    });

    const result = await taskData.save();
    if (result) res.status(201).send("task saved .");
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const getAll = await task.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
    if (getAll != []) {
      res.status(200).send(getAll);
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const getById = await task.findById(
      { _id: req.params.id },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    if (getById != null) {
      res.status(200).send(getById);
    } else {
      res.status(404).send("no records found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    await task
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            description: description,
            status: status,
          },
        }
      )
      .then((result) => {
        res.status(200).send("updated");
      });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteTask = async (req, res) => {

  try {
    await task.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res.status(204).send();
    });
  } catch (err) {
    throw new Error(err);
  }
};
