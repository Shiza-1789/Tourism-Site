import {makeAutoObservable} from "mobx";

export default class TourStore{
    constructor(){
        this._tours = []
        this._purchasedTours = []
        this._tourTypes = []
        this._selectedTourType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        makeAutoObservable(this)
    }

    setTours(tours){
        this._tours = tours
    }
    setPurchasedTours(purchasedTours){
        this._purchasedTours = purchasedTours
    }
    setTourTypes(tourTypes){
        this._tourTypes = tourTypes
    }
    setSelectedTourType(selectedTourType){
        this.setPage(1)
        this._selectedTourType = selectedTourType
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }
    setLimit(limit){
        this._limit = limit
    }

    get tours(){
        return this._tours
    }
    get purchasedTours(){
        return this._purchasedTours
    }
    get tourTypes(){
        return this._tourTypes
    }
    get selectedTourType(){
        return this._selectedTourType
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}