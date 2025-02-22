import { LightningElement , wire} from 'lwc';

import getTheatre from '@salesforce/apex/TheatreController.getTheatre';
import getMovies from '@salesforce/apex/MovieController.getMovies';
import getShows from '@salesforce/apex/MovieShowController.getShows';
import getShowsWithFilter from '@salesforce/apex/MovieShowController.getShowsWithFilter';
import getPatrons from '@salesforce/apex/PatronController.getPatrons';

import createTransaction from '@salesforce/apex/TransactionController.createTransaction';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class TransactionComponent extends LightningElement {

    theatreOptions = [];
    movieOptions = [];
    showOptions = [];
    patronOptions = [];

    selectedTheatre;
    selectedMovie;
    selectedShow;
    selectedPatron;
    numberOfTickets;
    email;
    phoneNumber;

    isTransactionSuccessful = false;

    //disabling show until both ids are selected
    get isShowDisabled(){
        return !(this.selectedMovie && this.selectedTheatre);
    }

    //for theatre
    @wire(getTheatre)
    wiredTheatreList({ error, data }) {
        if (data) {
            this.theatreOptions = data.map((theatre) => ({
                label: theatre.Name,
                value: theatre.Id, 
            }));
        }
    }

    handleTheatre(event) {
        this.selectedTheatre = event.detail.value;
        this.filterShows();
    }

    //for movies
    @wire(getMovies)
    wiredMovieList({ error, data }) {
        if (data) {
            this.movieOptions = data.map((movie) => ({
                label: movie.Name,
                value: movie.Id, 
            }));
        }
    }

    handleMovie(event) {
        this.selectedMovie = event.detail.value;
        this.filterShows();
    }

    //filter for show
    filterShows(){
        if(this.selectedMovie && this.selectedTheatre){
            getShowsWithFilter({movieId: this.selectedMovie, theatreId: this.selectedTheatre})
                .then((data)=>{
                    this.showOptions = data.map((show) => ({
                        label: show.Name,
                        value: show.Id
                    }))
                })
        }
        else{
            this.showOptions = [];
        }
    }

    handleShow(event) {
        this.selectedShow = event.detail.value;
    }

    //for patrons
    @wire(getPatrons)
    wiredPatronList({ error, data }) {
        if (data) {
            this.patronOptions = data.map((patron) => ({
                label: patron.Name,
                value: patron.Id, 
            }));
        }
    }

    handlePatron(event) {
        this.selectedPatron = event.detail.value;
    }

    handleNumberofTickets(event){
        this.numberOfTickets = event.target.value;
    }

    handleEmail(event){
        this.email = event.target.value;
    }

    handleNumber(event){
        this.phoneNumber = event.target.value;
    }

    async handleConfirm() {
        if (!this.selectedShow) {
            alert('Show Time is required.');
            return;
        }
        if (!this.selectedPatron) {
            alert('Patron Name is required.');
            return;
        }
        if (!this.numberOfTickets || parseInt(this.numberOfTickets, 10) <= 0) {
            alert('Number of Tickets must be greater than 0.');
            return;
        }
        if (!this.email) {
            alert('Email is required.');
            return;
        }
        if (!this.phoneNumber) {
            alert('Mobile Number is required.');
            return;
        }

        const details = {
            ShowTime: this.selectedShow,
            PatronName: this.selectedPatron,
            NumberOfTickets: Number(this.numberOfTickets),
            Email: this.email,
            PhoneNumber: this.phoneNumber
        };

        createTransaction({ details: details })
        .then((res) => {
            if(res.startsWith('Transaction created successfully')){
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: res,
                    variant: 'success'
                }));
                this.isTransactionSuccessful = true;
            } else {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: res,
                    variant: 'error'
                }));
            }
        }) 
        .catch ((error) => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Some error occured: ' +(error.body ? error.body.message : error.message),
                variant: 'error'
            }));
        })
    }

    handleFinish(){
        this.selectedTheatre = null;
        this.selectedMovie = null;
        this.selectedShow = null;
        this.selectedPatron = null;
        this.numberOfTickets = null;
        this.email = "";
        this.phoneNumber = ""; 
        if(this.isTransactionSuccessful){
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Thank you for booking!',
                variant: 'success'
            }));
            this.isTransactionSuccessful = false;
        } 
        else{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Fields Empty',
                message: 'Oh! you have to fill details again',
                variant: 'warning'
            }));
        } 
    }
}