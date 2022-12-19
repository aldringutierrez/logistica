package com.bezkoder.spring.datajpa.model;

	import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

		@Entity
		@Table(name = "Envios")
		public class Envio {

			@Id
			@GeneratedValue(strategy = GenerationType.AUTO)
			private long id;

			//@Column(name = "cliente_id")
			private Long clienteId;

			@Column(name = "producto_id")
			private Long productoId;

			@Column(name = "bodega_id")
			private Long bodegaId;

			@Column(name = "puerto_id")
			private Long puertoId;

			@Column(name = "cantidad")
			private Double cantidad;

			@Column(name = "precio")
			private Double precio;

			@Column(name = "descuento")
			private Double descuento;

			@Column(name = "total")
			private Double total;

			@Column(name = "fecha_registro")
			private Date fechaRegistro;

			@Column(name = "fecha_entrega")
			private Date fechaEntrega;

			@Column(name = "placa")
			private String placa;

			@Column(name = "flota")
			private String flota;

			@Column(name = "guia")
			private String guia;

			@Column(name = "internacional")
			private String internacional;

			public Envio() {

			}

			public Envio(Long clienteId,Long productoId,Long bodegaId,Long puertoId, Double cantidad, Double precio, Double descuento, Double total,
					Date fechaRegistro,Date fechaEntrega,String placa,String flota,String guia,String internacional) {
				this.clienteId = clienteId;
				this.productoId = productoId;
				this.bodegaId = bodegaId;
				this.puertoId = puertoId;
				this.cantidad = cantidad;
				this.precio = precio;
				this.descuento = descuento;
				this.total = total;
				this.fechaRegistro= fechaRegistro;
				this.fechaEntrega	= fechaEntrega;
				this.placa = placa			;
				this.flota = flota			;
				this.guia	= guia			;
				this.internacional= internacional;
			}

			public long getId() {
				return id;
			}

			public void setId(long id) {
				this.id = id;
			}



			public Long getClienteId() {
				return clienteId;
			}

			public void setClienteId(Long clienteId) {
				this.clienteId = clienteId;
			}

			public Long getProductoId() {
				return productoId;
			}

			public void setProductoId(Long productoId) {
				this.productoId = productoId;
			}

			public Long getBodegaId() {
				return bodegaId;
			}

			public void setBodegaId(Long bodegaId) {
				this.bodegaId = bodegaId;
			}

			public Long getPuertoId() {
				return puertoId;
			}

			public void setPuertoId(Long puertoId) {
				this.puertoId = puertoId;
			}

			public Double getCantidad() {
				return cantidad;
			}

			public void setCantidad(Double cantidad) {
				this.cantidad = cantidad;
			}

			public Double getPrecio() {
				return precio;
			}

			public void setPrecio(Double precio) {
				this.precio = precio;
			}

			public Double getDescuento() {
				return descuento;
			}

			public void setDescuento(Double descuento) {
				this.descuento = descuento;
			}

			public Double getTotal() {
				return total;
			}

			public void setTotal(Double total) {
				this.total = total;
			}


			public String getPlaca() {
				return placa;
			}

			public void setPlaca(String placa) {
				this.placa = placa;
			}


			
			public Date getFechaRegistro() {
				return fechaRegistro;
			}

			public void setFechaRegistro(Date fechaRegistro) {
				this.fechaRegistro = fechaRegistro;
			}

			public Date getFechaEntrega() {
				return fechaEntrega;
			}

			public void setFechaEntrega(Date fechaEntrega) {
				this.fechaEntrega = fechaEntrega;
			}

			public String getFlota() {
				return flota;
			}

			public void setFlota(String flota) {
				this.flota = flota;
			}

			public String getGuia() {
				return guia;
			}

			public void setGuia(String guia) {
				this.guia = guia;
			}

			public String getInternacional() {
				return internacional;
			}

			public void setInternacional(String internacional) {
				this.internacional = internacional;
			}

			public Cliente getCliente() {
				return cliente;
			}

			public void setCliente(Cliente cliente) {
				this.cliente = cliente;
			}

			@Override
			public String toString() {
				return "Envio [id=" + id + ", cliente_id=" + clienteId+ ", producto=" + productoId  + "]";
			}

			@ManyToOne
			@JoinColumn(name = "clienteId", referencedColumnName = "id", insertable = false, updatable = false)
			private Cliente cliente;
			
			
			
		}

