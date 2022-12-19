package com.bezkoder.spring.datajpa.controller;

	import java.util.ArrayList;
	import java.util.List;
	import java.util.Optional;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.DeleteMapping;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.bind.annotation.RestController;

	import com.bezkoder.spring.datajpa.model.Envio;
	import com.bezkoder.spring.datajpa.repository.EnvioRepository;

	@CrossOrigin(origins = "http://localhost:4200")
	@RestController
	@RequestMapping("/api")
	public class EnvioController {

		@Autowired
		EnvioRepository envioRepository;

		@GetMapping("/envios")
		public ResponseEntity<List<Envio>> getAllEnvios(@RequestParam(required = false) String clientId) {
			try {
				List<Envio> envios = new ArrayList<Envio>();

				if (clientId == null)
					envioRepository.findAll().forEach(envios::add);
				//else
				//	envioRepository.findByCliente(clientId).forEach(envios::add);

				if (envios.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}

				return new ResponseEntity<>(envios, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@GetMapping("/envios/{id}")
		public ResponseEntity<Envio> getEnvioById(@PathVariable("id") long id) {
			Optional<Envio> envioData = envioRepository.findById(id);

			if (envioData.isPresent()) {
				return new ResponseEntity<>(envioData.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@PostMapping("/envios")
		public ResponseEntity<Envio> createenvio(@RequestBody Envio envio) {
			System.out.println("@PostMapping(\"/envios\")");
			try {
				if (envio.getBodegaId()!=null&&envio.getPuertoId()!=null) {
					return new ResponseEntity<>(HttpStatus.resolve(418));
				}
				Envio _envio = envioRepository.save(new Envio(envio.getClienteId(), envio.getProductoId(), envio.getBodegaId(), envio.getPuertoId(),
						 envio.getCantidad(), envio.getPrecio(), envio.getDescuento(), envio.getTotal(),envio.getFechaRegistro(),envio.getFechaEntrega(),
						 envio.getPlaca(),envio.getFlota(),envio.getGuia(),envio.getInternacional()));
				return new ResponseEntity<>(_envio, HttpStatus.CREATED);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@PutMapping("/envios/{id}")
		public ResponseEntity<Envio> updateenvio(@PathVariable("id") long id, @RequestBody Envio envio) {
			System.out.println("@PutMapping(\"/envios/{id}\")");
			Optional<Envio> envioData = envioRepository.findById(id);

			if (envioData.isPresent()) {
				Envio _envio = envioData.get();
				_envio.setClienteId(envio.getClienteId());
				_envio.setProductoId(envio.getProductoId());
				_envio.setBodegaId(envio.getBodegaId());
				_envio.setPuertoId(envio.getPuertoId());
				_envio.setCantidad(envio.getCantidad());
				_envio.setPrecio(envio.getPrecio());
				_envio.setDescuento(envio.getDescuento());
				_envio.setTotal(envio.getTotal());
				_envio.setFechaRegistro(envio.getFechaRegistro());
				_envio.setFechaEntrega(envio.getFechaEntrega());
				_envio.setPlaca(envio.getPlaca());
				_envio.setFlota(envio.getFlota());
				_envio.setGuia(envio.getGuia());
				_envio.setInternacional(envio.getInternacional());
				if (envio.getBodegaId()!=null&&envio.getPuertoId()!=null) {
					return new ResponseEntity<>(HttpStatus.resolve(418));
				}
				return new ResponseEntity<>(envioRepository.save(_envio), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@DeleteMapping("/envios/{id}")
		public ResponseEntity<HttpStatus> deleteenvio(@PathVariable("id") long id) {
			System.out.println("borrando : "+id);
			try {
				envioRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@DeleteMapping("/envios")
		public ResponseEntity<HttpStatus> deleteAllenvios() {
			try {
				envioRepository.deleteAll();
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}


	}
