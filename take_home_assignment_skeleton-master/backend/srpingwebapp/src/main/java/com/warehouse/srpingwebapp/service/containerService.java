package com.warehouse.srpingwebapp.service;

import com.warehouse.srpingwebapp.Model.*;
import com.warehouse.srpingwebapp.entity.Inventory;
import com.warehouse.srpingwebapp.entity.container;
import com.warehouse.srpingwebapp.repository.ContainerRepository;
import com.warehouse.srpingwebapp.repository.InventoryRepository;
import com.warehouse.srpingwebapp.utilities.constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.web.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class containerService {

    @Autowired
    ContainerRepository containerRepository;

    @Autowired
    InventoryRepository inventoryRepository;

//    public containerResponse getAllPageContainerdb(){
//        ArrayList<LinkedList> arrPageContainer = new ArrayList<>();
//        List<container> containerslist = containerRepository.findByRootParentId(0);
//        for (container c: containerslist){
//            LinkedList<container> clist = new LinkedList<>();
//            clist.add(c);
//            List<container> cchild = containerRepository.findByRootParentId(c.getBarcode());
//            clist.addAll(cchild);
//            arrPageContainer.add(clist);
//        }
//        containerResponse response = new containerResponse();
//        response.setContainers(arrPageContainer);
//        return response;
//    }

// allscs = all container storing containers

    public containerResponse getContainers(String id){

        containerResponse response = new containerResponse();

        if(id.contains("all")){

            if (id.equals("allcsc"))
                response.setContainers(containerRepository.findBytypebool(true));
            else if(id.equals("allcsi"))
                response.setContainers(containerRepository.findBytypebool(false));

            response.setType("warehouse");
            response.setTypebool(true);

            return response;
        }

        int idint = Integer.parseInt(id);

        response.setTypebool(true);
        List<container> clist = containerRepository.findByparentid(idint);
        response.setContainers(clist);

        List<Inventory> ilist = inventoryRepository.findByparentid(idint);;
        response.setInventories(ilist);

        if (idint!=0){
            container container = containerRepository.findBybarcode(idint);
            response.setType(container.getType());
            if (!container.isTypebool()) {
                response.setTypebool(false);
            }
        }
        else{
            response.setType("warehouse");
        }

        return response;
    }



//    public ResponseEntity<?> createContainer(containerCreate containerCreate){
//        container newContainer = new container();
//        if (containerCreate.getParentId()!=0) {
//            container parent = containerRepository.findBybarcode(containerCreate.getParentId());
//            if (!parent.getType()){
//                return new ResponseEntity<>("Cannot add container in this type",HttpStatus.BAD_REQUEST);
//            }
//            if (parent.getRootParentId() == 0) {
//                newContainer.setRootParentId(parent.getBarcode());
//            }
//            else {
//                newContainer.setRootParentId(parent.getRootParentId());
//            }
//            newContainer.setType(containerCreate.getType());
//            newContainer.setListnum(parent.getListnum()+1);
//        }
//        else {
//            newContainer.setRootParentId(0);
//            newContainer.setType(containerCreate.getType());
//            newContainer.setListnum(0);
//        }
//        containerRepository.save(newContainer);
//        return new ResponseEntity<>(newContainer, HttpStatus.OK);
//
//    }
    public ResponseEntity<?> createContainer(containerCreate containerCreate){
        container newContainer = new container();
        if (containerCreate.getParentId()!=0) {
            if (constants.getC2().contains(containerRepository.findBybarcode(containerCreate.getParentId()).getType()))
            return new ResponseEntity<>("Cannot add container in this type", HttpStatus.BAD_REQUEST);
            else if (containerRepository.findBybarcode(containerCreate.getParentId()).getRootParentid() == 0)
                newContainer.setRootParentid(containerCreate.getParentId());
            else
                newContainer.setRootParentid(containerRepository.findBybarcode(containerCreate.getParentId()).getRootParentid());

            newContainer.setListnum(containerRepository.findBybarcode(containerCreate.getParentId()).getListnum()+1);
        }

        if(constants.getC1().contains(containerCreate.getType()))
            newContainer.setTypebool(true);
        else
            newContainer.setTypebool(false);

        newContainer.setParentid(containerCreate.getParentId());
        newContainer.setType(containerCreate.getType());
        containerRepository.save(newContainer);
        return new ResponseEntity<>(newContainer, HttpStatus.OK);
    }

    public ResponseEntity<?> moveContainer(containerMove containerMove){
        container movedContainer = containerRepository.findBybarcode(containerMove.getSourceId());
        container ParentContainer = containerRepository.findBybarcode(containerMove.getDestId());
        movedContainer.setParentid(containerMove.getDestId());

        if (ParentContainer.getRootParentid()==0)
            movedContainer.setRootParentid(containerMove.getDestId());
        else
            movedContainer.setRootParentid(ParentContainer.getRootParentid());

        containerRepository.save(movedContainer);
        return new ResponseEntity<>(movedContainer,HttpStatus.OK);
    }

    public ResponseEntity<?> moveInventory(containerMove containerMove){
        Inventory movedInventory = inventoryRepository.findBybarcode(containerMove.getSourceId());
        container ParentContainer = containerRepository.findBybarcode(containerMove.getDestId());
        movedInventory.setParentid(containerMove.getDestId());

        if (ParentContainer.getRootParentid()==0)
            movedInventory.setRootParentid(containerMove.getDestId());
        else
            movedInventory.setRootParentid(ParentContainer.getRootParentid());

        inventoryRepository.save(movedInventory);
        return new ResponseEntity<>(movedInventory,HttpStatus.OK);
    }

    public ResponseEntity<?> deleteContainer(String id){
        Integer idint = Integer.parseInt(id);
        if (!containerRepository.findByparentid(idint).isEmpty()||!inventoryRepository.findByparentid(idint).isEmpty()){
            return new ResponseEntity<>("Cannot be deleted , Contains Item",HttpStatus.METHOD_NOT_ALLOWED);
        }
        containerRepository.deleteBybarcode(idint);
        return new ResponseEntity<>("deleted",HttpStatus.OK);

    }

    public ResponseEntity<?> createInventory(inventoryCreate inventoryCreate){
        Inventory inventory = new Inventory();

        container parentcontainer=containerRepository.findBybarcode(inventoryCreate.getParentId());

        if (parentcontainer.isTypebool()){
            return new ResponseEntity<>("Cannot add inventory in this type,Sorry", HttpStatus.BAD_REQUEST);
        }

        if (parentcontainer.getRootParentid()==0)
            inventory.setRootParentid(inventoryCreate.getParentId());
        else
            inventory.setRootParentid(parentcontainer.getRootParentid());

        inventory.setListnum(parentcontainer.getListnum()+1);
        inventory.setParentid(inventoryCreate.getParentId());
        inventory.setAmount(inventoryCreate.getAmount());
        inventory.setDes(inventoryCreate.getDes());
        inventory.setName(inventoryCreate.getName());

        inventoryRepository.save(inventory);
        return new ResponseEntity<>(inventory,HttpStatus.OK);
    }


    public ResponseEntity<?> getRootParentInventory(String id){
        Integer idint = Integer.parseInt(id);
        Inventory inventory = inventoryRepository.findBybarcode(idint);
        container container = getRoot(inventory.getParentid());
        return new ResponseEntity<>(container,HttpStatus.OK);
    }

    public container getRoot(Integer id){
        container container = containerRepository.findBybarcode(id);
        if(container.getParentid()==0){
            return container;
        }
        return getRoot(container.getRootParentid());
    }

    public ResponseEntity<?> deleteInventory(String id){
        Integer idint = Integer.parseInt(id);
        inventoryRepository.deleteBybarcode(idint);
        return new ResponseEntity<>("deleted",HttpStatus.OK);

    }

}
