const { Router } = require('express')
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        renderNotes, 
        renderEditForm,
        updateNote,
        deleteNote 
    } = require('../controllers/notes.controller')

// importamos un midelware para validar que usuario existe
const {isAuthenticated} = require('../helpers/auth')

// New Notesb
router.get('/notes/add',isAuthenticated, renderNoteForm)
router.post('/notes/new-note', createNewNote)

//Get All Note
router.get('/notes', isAuthenticated, renderNotes)

//Edit Note
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)
router.put('/notes/edit/:id', isAuthenticated, updateNote)

//Delete Note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote )


module.exports = router