
# Flujo de consumo: Pagos (Recibos) del frontend al backend

A continuación se explica cómo las acciones del usuario en la vista de pagos disparan llamadas a los endpoints del backend y cómo estos endpoints utilizan las funciones del servicio correspondiente en el backend.

## 1. Al iniciar la vista de pagos
- **Acción:** Se carga la vista `PagosWsView.vue`.
- **Qué ocurre:**
  - Automáticamente se solicita el listado de recibos del día actual (o del rango por defecto).
  - Se llama al endpoint:
    - **GET** `/api/clientes-recprov/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Este endpoint ejecuta la función correspondiente en el servicio de recibos (por ejemplo, `findByFechaConCliente` o similar, según tu backend).
  - **Resultado:** Se obtiene la lista de recibos con datos de cliente, que se muestra en la tabla.

## 2. Cuando el usuario cambia el rango de fechas
- **Acción:** El usuario selecciona un nuevo rango de fechas en el filtro de la vista.
- **Qué ocurre:**
  - Se vuelve a llamar al endpoint:
    - **GET** `/api/clientes-recprov/filtro/fecha?desde=...&hasta=...`
  - **Backend:** Se ejecuta nuevamente la función de búsqueda por fecha en el servicio de recibos.
  - **Resultado:** Se actualiza la tabla con los recibos del nuevo rango.

## 3. Cuando el usuario hace clic en un recibo para ver el detalle
- **Acción:** El usuario selecciona un recibo en la tabla.
- **Qué ocurre:**
  - (Si existe endpoint de detalle) Se llama al endpoint:
    - **GET** `/api/clientes-recprov/:codRecibo` (esto depende de tu implementación)
  - **Backend:** Este endpoint ejecuta la función de detalle de recibo en el servicio.
  - **Resultado:** Se muestra el detalle completo del recibo seleccionado.

## 4. Cuando se filtra por sucursal o teléfono
- **Acción:** El usuario utiliza los filtros de sucursal o teléfono en la vista.
- **Qué ocurre:**
  - El filtrado se realiza en el frontend, sobre los datos ya obtenidos del endpoint de recibos por fecha.
  - **No se realiza una nueva llamada al backend** para estos filtros.

---

> **Resumen:**
> - La vista principal de pagos consume principalmente el endpoint `/api/clientes-recprov/filtro/fecha` (función de búsqueda por fecha en el backend).
> - El detalle de un recibo (si existe) se obtiene con `/api/clientes-recprov/:codRecibo` (función de detalle en el backend).
> - Los filtros de sucursal y teléfono se aplican en el frontend, no en el backend.

De esta forma, cada acción del usuario en la interfaz de pagos tiene un flujo claro hacia el backend y sus funciones correspondientes. 