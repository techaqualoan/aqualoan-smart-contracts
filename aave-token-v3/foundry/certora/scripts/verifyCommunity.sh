if [[ "$1" ]]
then
    RULE="--rule $1"
fi

certoraRun certora/harness/AquaTokenV3HarnessCommunity.sol:AquaTokenV3Harness \
    --verify AquaTokenV3Harness:certora/specs/community.spec \
    --packages openzeppelin-contracts=lib/openzeppelin-contracts \
    $RULE \
    --solc solc8.13 \
    --send_only \
    --optimistic_loop \
    --cloud \
    --msg "AquaTokenV3HarnessCommunity:community.spec $1"
# --sanity

