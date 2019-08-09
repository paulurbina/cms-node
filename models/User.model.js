const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
   firstName: {
       type: String, required: true
   },
   lastName: {
       type: String, required: true
   },
   email: {
       type: String, required: true
   },
   password: {
       type: String, required: true
   },
   
});
// generate hash to password user
UserSchema.methods.generateHash = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
};
// valida passport to password user
UserSchema.methods.validPassword = async function (password) {
    return await bcryptjs.compareSync(password, this.password);
}

module.exports = model('User', UserSchema);