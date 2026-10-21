const express = require('express')
const auth = require('../middleware/auth')
const key = require('../database/models/key')

const router = express.Router()

router.get('/keys', async (req, res) => {
    try {
        const result = await key.findAll({ attributes: ['id', 'room'] })
        return res.json({ message: 'sikeres lekérdezés: keys', result })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Szerver hiba a lekérdezésnél' })
    }
})

router.get('/mykeys', auth(), async (req, res) => {
    try {
        const { ownerId } = req
        const result = await key.findAll({ where: { ownerId } })
        return res.status(200).json({ message: 'Sikeres listázás: mykeys', result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Szerver hiba a saját kulcsok listázásánál' })
    }
})

router.post('/mykeys', auth(), async (req, res) => {
    try {
        const { ownerId } = req
        const { room } = req.body
        if (!room)
            return res.status(422).json({ message: 'Hiányzó room' })
        const oneKey = await key.findOne({ where: { ownerId, room } })
        if (oneKey)
            return res.status(409).json({ message: 'már van ilyen kulcsod' })
        const newKey = await key.create({ ownerId, room })
        return res.status(201).json({ message: 'Sikeres kulcs létrehozás', newKey })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Szerver hiba kulcs létrehozásnál' })
    }
})
router.delete('/mykeys', auth(), (req, res) =>
    res.status(404).json({ message: 'Hiányzó id törléshez' }))

router.delete('/mykeys/:id', auth(), async (req, res) => {
    try {
        const { ownerId } = req
        const { id } = req.params
        //const id = req.params.id
        const oneKey = await key.findOne({ where: { id, ownerId } })
        if (!oneKey)
            return res.status(404).json({ message: 'Nincs ilyen kulcsod' })
        //const deletedKey = await key.destroy({ where: { id, ownerId } })
        await oneKey.destroy()
        res.status(200).json({ message: 'Sikeres törlés' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Szerver hiba a kulcs törlésnél' })
    }
})

router.put("/mykeys", auth(), async (req, res) => {
    try {
        const { ownerId } = req
        const { id, room } = req.body
        if (!id || !room)
            return res.status(422).json({ message: 'Hiányzó adatok kulcs módosításhoz' })
        const oneKey = await key.findOne({ where: { id, ownerId } })
        if (!oneKey)
            return res.status(404).json({ message: 'nincs ilyen kulcsod' })
        await oneKey.update({ room })
        res.status(200).json({message: 'Sikeres kulcs módosítás'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Szerver hiba kulcs módosításnál' })
    }
})

module.exports = router