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

	import com.bezkoder.spring.datajpa.model.Cliente;
	import com.bezkoder.spring.datajpa.repository.ClienteRepository;

	@CrossOrigin(origins = "http://localhost:4200")
	@RestController
	@RequestMapping("/api")
	public class ClienteController {

		@Autowired
		ClienteRepository clienteRepository;

		@GetMapping("/clientes")
		public ResponseEntity<List<Cliente>> getAllClientes(@RequestParam(required = false) String nombre) {
			try {
				List<Cliente> clientes = new ArrayList<Cliente>();

				if (nombre == null)
					clienteRepository.findAll().forEach(clientes::add);
				else
					clienteRepository.findByNombreContaining(nombre).forEach(clientes::add);

				if (clientes.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}

				return new ResponseEntity<>(clientes, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@GetMapping("/clientes/{id}")
		public ResponseEntity<Cliente> getClienteById(@PathVariable("id") long id) {
			Optional<Cliente> clienteData = clienteRepository.findById(id);

			if (clienteData.isPresent()) {
				return new ResponseEntity<>(clienteData.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@PostMapping("/clientes")
		public ResponseEntity<Cliente> createcliente(@RequestBody Cliente cliente) {
			try {
				Cliente _cliente = clienteRepository.save(new Cliente(cliente.getNombre(), cliente.getDireccion(), cliente.getEmail(), cliente.getTelefono()));
				return new ResponseEntity<>(_cliente, HttpStatus.CREATED);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@PutMapping("/clientes/{id}")
		public ResponseEntity<Cliente> updatecliente(@PathVariable("id") long id, @RequestBody Cliente cliente) {
			Optional<Cliente> clienteData = clienteRepository.findById(id);

			if (clienteData.isPresent()) {
				Cliente _cliente = clienteData.get();
				_cliente.setNombre(cliente.getNombre());
				_cliente.setDireccion(cliente.getDireccion());
				_cliente.setEmail(cliente.getEmail());
				_cliente.setTelefono(cliente.getTelefono());
				return new ResponseEntity<>(clienteRepository.save(_cliente), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@DeleteMapping("/clientes/{id}")
		public ResponseEntity<HttpStatus> deletecliente(@PathVariable("id") long id) {
			System.out.println("borrando : "+id);
			try {
				clienteRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@DeleteMapping("/clientes")
		public ResponseEntity<HttpStatus> deleteAllclientes() {
			try {
				clienteRepository.deleteAll();
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}

		@GetMapping("/clientes/published")
		public ResponseEntity<List<Cliente>> findByPublished() {
			try {
				List<Cliente> clientes = clienteRepository.findByEmail("qq@gmail.com");

				if (clientes.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<>(clientes, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

	}
