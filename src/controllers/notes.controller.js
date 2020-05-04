const notesCtrl = {};

const Note = require('../models/Note')

notesCtrl.renderNoteForm = (req , res) => {
    
    res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req , res) => {
    const { title , description } = req.body
    const newNote = new Note({title , description})
    
    // cojemos el id del usuario en sesion
    // console.log(req.user.id)
    newNote.user = req.user.id

    await newNote.save();

    // console.log(newNote)
    // cuando usamos el middelware flash() en el server al req se le agrega una funcion nueva
    req.flash('success_msg', 'Notes Added Successfully')
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req , res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'})
    res.render('notes/all-notes', {notes})
}

notesCtrl.renderEditForm = async (req , res) => {
    const note = await Note.findById(req.params.id)
    // console.log(note)
    if(note.user != req.user.id){
        req.flash('error_msg', 'Not Authorized')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', {note})
}

notesCtrl.updateNote = async (req , res) => {
    // console.log(req.body)
    const { title , description } = req.body
    const result = await Note.findByIdAndUpdate(req.params.id, { title , description } )
    // console.log(result)
    req.flash('success_msg', 'Notes Update Successfully')
    res.redirect('/notes')
}

notesCtrl.deleteNote = async (req, res) => {
    // console.log(req.params.id)    
    const result = await Note.findByIdAndDelete(req.params.id)
    // console.log(result)
    req.flash('success_msg', 'Notes Deleted Successfully')
    res.redirect('/notes')
}


module.exports = notesCtrl