import { Test, TestingModule } from '@nestjs/testing';
import { FormaPagoService } from './forma-pago.service';
import { Repository } from 'typeorm';
import { FormaPago } from './entities/forma-pago.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockFormaPagoRepository = {
  find: jest.fn().mockResolvedValue([
    {
      "CodForPago": "ACLI",
      "TipoForma": "O",
      "FormaPago": "* ANTICIPOS Y CREDITO A FAVOR DE CLIENTES",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "AME",
      "TipoForma": "M",
      "FormaPago": "MUTUAL AME",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "BAN",
      "TipoForma": "C",
      "FormaPago": "DEPOSITO BANCARIO",
      "CodRef": "BAN"
    },
    {
      "CodForPago": "BON",
      "TipoForma": "O",
      "FormaPago": "BONOS DE PROMOCIONES",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "BTR",
      "TipoForma": "C",
      "FormaPago": "TRANSFERENCIA BANCO FORMOSA",
      "CodRef": "CUS"
    },
    {
      "CodForPago": "CCE",
      "TipoForma": "F",
      "FormaPago": "CREDITO EMPLEADOS",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CHE",
      "TipoForma": "C",
      "FormaPago": "CHEQUES",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "COD",
      "TipoForma": "T",
      "FormaPago": "MERCADO PAGO",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "COM",
      "TipoForma": "C",
      "FormaPago": "CONTADO 4 DIAS LOCOS",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CON",
      "TipoForma": "C",
      "FormaPago": "CONTADO",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "COP",
      "TipoForma": "T",
      "FormaPago": "ONDA FORMOSA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CPC",
      "TipoForma": "F",
      "FormaPago": "CRED PROMO LIVING 3 Y 6",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CPR",
      "TipoForma": "F",
      "FormaPago": "CREDITO CELULARES",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRE",
      "TipoForma": "F",
      "FormaPago": "CREDITO PERSONAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRF",
      "TipoForma": "F",
      "FormaPago": "PROMO MAMA MIA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRM",
      "TipoForma": "F",
      "FormaPago": "CREDITO EXPO-MODULARES",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRN",
      "TipoForma": "F",
      "FormaPago": "CREDITO PORMO 7 PAGOS S/INT",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRR",
      "TipoForma": "F",
      "FormaPago": "REFINANCIACION",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRS",
      "TipoForma": "F",
      "FormaPago": "CREDITO MAYORISTA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "CRV",
      "TipoForma": "F",
      "FormaPago": "CRED PROMO 4 Y 5 PAGOS SIN INTERES",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "DOL",
      "TipoForma": "C",
      "FormaPago": "DOLARES",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "EFC",
      "TipoForma": "C",
      "FormaPago": "EFECTIVO 25 % FERIA DEL COLCHON",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "EFD",
      "TipoForma": "C",
      "FormaPago": "EFECTIVO 20 % PROMO MAMMA MIA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "EFE",
      "TipoForma": "C",
      "FormaPago": "EFECTIVO",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "EFP",
      "TipoForma": "C",
      "FormaPago": "EFECTIVO 20 % PROMO LIVING",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "MUL",
      "TipoForma": "X",
      "FormaPago": "MULTIPLES METODOS",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "OTR",
      "TipoForma": "C",
      "FormaPago": "OTROS",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "TAE",
      "TipoForma": "T",
      "FormaPago": "TARJETA AMERICAN EXP",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TBF",
      "TipoForma": "T",
      "FormaPago": "TARJETA BLACK FRIDAY",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCA",
      "TipoForma": "T",
      "FormaPago": "TARJETA .CABAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCC",
      "TipoForma": "T",
      "FormaPago": "CONTADO TARJETA CRED.10% PAGO 1 VISA-MASTER-CABAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCD",
      "TipoForma": "T",
      "FormaPago": "TARJETA CREDIL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCH",
      "TipoForma": "T",
      "FormaPago": "TARJETA CHIGUE 24",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCK",
      "TipoForma": "T",
      "FormaPago": "TARJETA PLAN SIMPLE",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCP",
      "TipoForma": "T",
      "FormaPago": "TARJETA PROMO CABAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCR",
      "TipoForma": "T",
      "FormaPago": "TARJETA CREDENCIAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TCT",
      "TipoForma": "T",
      "FormaPago": "TARJETA PROMO TUYA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TDB",
      "TipoForma": "T",
      "FormaPago": "DEBITO BANELCO",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TDE",
      "TipoForma": "T",
      "FormaPago": "DEBITO ELECTRON",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TDI",
      "TipoForma": "T",
      "FormaPago": "TARJETA DINERS",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TDJ",
      "TipoForma": "T",
      "FormaPago": "CONTADO DEBITO 15 %MAESTRO-BANELCO-CABAL",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TDM",
      "TipoForma": "T",
      "FormaPago": "DEBITO MAESTRO",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TFS",
      "TipoForma": "T",
      "FormaPago": "DEBITO FORMOSA 24",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "TM",
      "TipoForma": "C",
      "FormaPago": "TRANSFERENCIA MERCADO PAGO",
      "CodRef": "CAJ"
    },
    {
      "CodForPago": "TMC",
      "TipoForma": "T",
      "FormaPago": "TARJETA .MASTERCARD",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TMP",
      "TipoForma": "T",
      "FormaPago": "TARJETA MASTERCARD AHORA 12/18",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TNA",
      "TipoForma": "T",
      "FormaPago": "TARJETA .NARANJA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TNP",
      "TipoForma": "T",
      "FormaPago": "TARJETA .NARANJA Z",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TUP",
      "TipoForma": "T",
      "FormaPago": "TARJETA PROMO TUYA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TUY",
      "TipoForma": "T",
      "FormaPago": "TARJETA .TUYA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TVE",
      "TipoForma": "T",
      "FormaPago": "DEBITO ELECTRON",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TVI",
      "TipoForma": "T",
      "FormaPago": "TARJETA .VISA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TVP",
      "TipoForma": "T",
      "FormaPago": "TARJETA PROMO VISA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "TYA",
      "TipoForma": "T",
      "FormaPago": "CUOTA YA",
      "CodRef": "CLI"
    },
    {
      "CodForPago": "U10",
      "TipoForma": "M",
      "FormaPago": "MUTUAL U-10",
      "CodRef": "CLI"
    }
  ])
}

describe('FormaPagoService', () => {
  let service: FormaPagoService;
  let repository: Repository<FormaPago>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormaPagoService,
        {
          provide: getRepositoryToken(FormaPago,'sqlserverConnection'),
          useValue: mockFormaPagoRepository
        }
      ],
      
    }).compile();

    service = module.get<FormaPagoService>(FormaPagoService);
    repository = module.get<Repository<FormaPago>>(getRepositoryToken(FormaPago, 'sqlserverConnection'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should return the correct number of FormaPago items', async () => {
    const result = await service.findAll();
    // Verifica que el número de elementos devueltos sea igual al número de objetos en el mock
    expect(result.length).toBeGreaterThan(50); // Cambia '57' al número correcto de elementos en tu mock
    expect(repository.find).toHaveBeenCalledTimes(1); // Verifica que se haya llamado una vez
  });

  it('should contain a specific FormaPago item', async () => {
    const result = await service.findAll();
    
    // Verifica si el array contiene un elemento específico
    expect(result).toContainEqual({
      CodForPago: 'AME',
      TipoForma: 'M',
      FormaPago: 'MUTUAL AME',
      CodRef: 'CLI',
    });
  
    expect(repository.find).toHaveBeenCalledTimes(2); // Verifica que se haya llamado una vez
  });
  it('should have a FormaPago item with partial matching properties', async () => {
    const result = await service.findAll();
  
    // Verifica que el array contenga un objeto con propiedades específicas
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodForPago: 'AME',
          FormaPago: 'MUTUAL AME',
        }),
      ]),
    );
  
    expect(repository.find).toHaveBeenCalledTimes(3); // Verifica que se haya llamado una vez
  });
});
