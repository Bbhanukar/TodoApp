function generate(error, id, name, initTime, editTime, workStatus) {
    let response = {
        error: error,
        id: id,
        name: name,
        initTime: initTime,
        editTime: editTime,
        workStatus: workStatus
    };

    return response;
}

module.exports = {
    generate: generate
}
