const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const pembayaran = models.pembayaran

const auth = require("../auth")
app.use(auth)

app.get("/", auth, async(req, res) => {
    pembayaran.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            massage : error.massage
        })
    })
})

app.post("/", auth, async(req, res) => {
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.create(data)
    .then(result => {
        res.json({
            message: "data berhasil ditambahkan",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req, res) => {
    let current = new Date().toISOString().split('T')[0]
    let param = { id_pembayaran: req.body.id_pembayaran}
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data berhasil diupdate",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_pembayaran", auth, async(req, res) => {
    let param = {id_pembayaran: req.params.id_pembayaran}
    pembayaran.destroy({where: param})
    .then(result => {
        res.json({
            message: "data berhasil dihapus",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app