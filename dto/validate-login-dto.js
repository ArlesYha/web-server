import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"
import Ajv from "ajv";

const loginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: 'El tipo debe ser un string',
                format: 'Email debe contener un correo electrónico válido',
            }
        }),
        password: Type.String({
            errorMessage: {
                type: 'El tipo de password debe de ser string',
            }
        }),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "El formato del objeto no es válido"
        }
    },
)

const ajv = new Ajv({allErrors: true});
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);
    
const validate = ajv.compile(loginDTOSchema)

const validateLoginDTO = (req, res, next) => {
    const isDTOValid = validate(req.body);

    if(!isDTOValid) return res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

    next();
}

export default validateLoginDTO;