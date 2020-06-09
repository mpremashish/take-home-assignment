package com.warehouse.srpingwebapp.controller;

import com.warehouse.srpingwebapp.Model.containerCreate;
import com.warehouse.srpingwebapp.Model.containerMove;
import com.warehouse.srpingwebapp.Model.containerResponse;
import com.warehouse.srpingwebapp.Model.inventoryCreate;
import com.warehouse.srpingwebapp.entity.container;
import com.warehouse.srpingwebapp.service.containerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@CrossOrigin
public class containerController {

    @Autowired
    private containerService containerService;

    @GetMapping("/containers")
    public containerResponse getContainers(@RequestParam String id){
        return containerService.getContainers(id);
    }

    @GetMapping("/rootParentInventory")
    public ResponseEntity<?> getRootParentInventory(@RequestParam String id){
        return containerService.getRootParentInventory(id);
    }

    @PostMapping("/createContainers")
    public ResponseEntity<?> createContainers(@RequestBody containerCreate containerCreate){
        return containerService.createContainer(containerCreate);
    }

    @PostMapping("/moveContainer")
    public ResponseEntity<?> moveContainer(@RequestBody containerMove containerMove){
        return containerService.moveContainer(containerMove);
    }

    @PostMapping("/moveInventory")
    public ResponseEntity<?> moveInventory(@RequestBody containerMove containerMove){
        return containerService.moveInventory(containerMove);
    }

    @DeleteMapping("/deleteContainer/{id}")
    public ResponseEntity<?> deleteContainer(@PathVariable String id){
        return containerService.deleteContainer(id);
    }

    @DeleteMapping("/deleteInventory/{id}")
    public ResponseEntity<?> deleteInventory(@PathVariable String id){
        return containerService.deleteInventory(id);
    }

    @PostMapping("/createInventory")
    public ResponseEntity<?> createInventory(@RequestBody inventoryCreate inventoryCreate){return containerService.createInventory(inventoryCreate);}
}
