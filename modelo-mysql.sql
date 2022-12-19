use logistica;

drop table  envios;
drop table  clientes;
drop table  productos;
drop table  bodegas;
drop table  puertos;


create table clientes (
id				bigint,
nombre			varchar(200),
direccion		varchar(200),
email			varchar(200),
telefono		numeric(20),
PRIMARY KEY (id)
);
create table productos(
id				bigint,
nombre			varchar(200),
descripcion		varchar(200),
PRIMARY KEY (id)
);
create table bodegas(
id				bigint,
nombre			varchar(200),
descripcion		varchar(200),
PRIMARY KEY (id)
);
create table puertos(
id				bigint,
nombre			varchar(200),
descripcion		varchar(200),
PRIMARY KEY (id)
);
create table envios(
id				bigint,
cliente_id		bigint,
producto_id		bigint,
bodega_id		bigint,
puerto_id		bigint,
cantidad		numeric(20),
precio      	numeric(20,2),
descuento      	numeric(20,2),
total      		numeric(20,2),
fecha_registro	timestamp,
fecha_entrega	timestamp,
placa			varchar(200),
flota			varchar(200),
guia			varchar(200),
internacional	varchar(1),
PRIMARY KEY (id),
foreign key(cliente_id) references clientes(id),
foreign key(producto_id) references productos(id),
foreign key(bodega_id) references bodegas(id),
foreign key(puerto_id) references puertos(id)
);
