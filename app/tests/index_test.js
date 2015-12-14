console.log(1212);
describe('WordPet Test',function(){
  
    beforeEach(function(){
      module('WordPet');
    })

    var Settings,
    Authorization,
    Athentication,
    Refs;
    
    beforeEach(inject(function($injector){
      Refs = $injector.get('Refs');
    }));
    
    // beforeEach(function(done){
    //   done();
    // });

    describe('WordPet Test',function(){

        // it('should pass test',function(done){
        //   expect(Refs).toBeDefined();
        //   done();
        // });

        it('should pass this 1',function(){
          expect(1).toBe(1);
        });
    });
});