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

	import com.bezkoder.spring.datajpa.model.Producto;
	import com.bezkoder.spring.datajpa.repository.ProductoRepository;

	@CrossOrigin(origins = "http://localhost:4200")
	@RestController
	@RequestMapping("/api")
	public class ProductoController {

		@Autowired
		ProductoRepository productoRepository;

		@GetMapping("/productos")
		public ResponseEntity<List<Producto>> getAllProductos(@RequestParam(required = false) String nombre) {
			try {
				List<Producto> productos = new ArrayList<Producto>();

				if (nombre == null)
					productoRepository.findAll().forEach(productos::add);
				else
					productoRepository.findByNombreContaining(nombre).forEach(productos::add);

				if (productos.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}

				return new ResponseEntity<>(productos, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@GetMapping("/productos/{id}")
		public ResponseEntity<Producto> getProductoById(@PathVariable("id") long id) {
			Optional<Producto> productoData = productoRepository.findById(id);

			if (productoData.isPresent()) {
				return new ResponseEntity<>(productoData.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@PostMapping("/productos")
		public ResponseEntity<Producto> createproducto(@RequestBody Producto producto) {
			try {
				Producto _producto = productoRepository.save(new Producto(producto.getNombre(), producto.getDescripcion()));
				return new ResponseEntity<>(_producto, HttpStatus.CREATED);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@PutMapping("/productos/{id}")
		public ResponseEntity<Producto> updateproducto(@PathVariable("id") long id, @RequestBody Producto producto) {
			Optional<Producto> productoData = productoRepository.findById(id);

			if (productoData.isPresent()) {
				Producto _producto = productoData.get();
				_producto.setNombre(producto.getNombre());
				_producto.setDescripcion(producto.getDescripcion());
				return new ResponseEntity<>(productoRepository.save(_producto), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@DeleteMapping("/productos/{id}")
		public ResponseEntity<HttpStatus> deleteproducto(@PathVariable("id") long id) {
			System.out.println("borrando : "+id);
			try {
				productoRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		@DeleteMapping("/productos")
		public ResponseEntity<HttpStatus> deleteAllproductos() {
			try {
				productoRepository.deleteAll();
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}

		@GetMapping("/productos/published")
		public ResponseEntity<List<Producto>> findByPublished() {
			try {
				List<Producto> productos = productoRepository.findByDescripcion("qq@gmail.com");

				if (productos.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<>(productos, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

	}
