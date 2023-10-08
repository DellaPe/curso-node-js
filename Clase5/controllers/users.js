export class UserController {
  constructor ({ userusersModel }) {
    this.userusersModel = userusersModel
  }

  create = async (req, res) => {
    const { user } = req.body
    const { hasError, error, newUser } = await this.userusersModel.create({ user })
    if (hasError) return res.status(409).json({ error })
    res.status(201).json(newUser)
  }
}
